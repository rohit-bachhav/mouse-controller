import { StyleSheet, PanResponder, Text, View, Button, Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import BarcodeScanner from '../components/BarcodeScanner';
export default function Index() {
  const [cord, setCord] = useState([0, 0]);
  const last = useRef(new Animated.ValueXY()).current;
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [socketStatus, setSocketStatus] = useState("Disconnected");
  const scannedRef = useRef(false);
  const wsRef = useRef<WebSocket | null>(null);
  let lastSent = Date.now();
  const handleBarcodeScanned = (data: string) => {
    if (scannedRef.current) return;
    scannedRef.current = true;

    setServerUrl(data);
    setShowScanner(false);

    setTimeout(() => {
      scannedRef.current = false;
    }, 1000);
  };
  useEffect(() => {
    if (!serverUrl) return;

    try {
      const ws = new WebSocket(serverUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setSocketStatus("Connected");
      };

      ws.onmessage = (e) => {
        console.log("Message from server:", e.data);
      };

      ws.onerror = (e) => {
        setSocketStatus("Error");
      };

      ws.onclose = () => {
        setSocketStatus("Closed");
      };
    } catch (err) {
      console.error("WebSocket error", err);
      setSocketStatus("Failed to connect");
    }

    return () => {
      wsRef.current?.close();
    };
  }, [serverUrl]);
  const moveTch = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { dx, dy, vx, vy } = gestureState;
        setCord([vx*1000, vy*1000]);

        if (wsRef.current?.readyState === WebSocket.OPEN && Date.now() - lastSent >10) {
          wsRef.current.send(`${dx},${dy}`);
          lastSent = Date.now()
        }

      },
    })
  ).current;

  return showScanner ? (
    <BarcodeScanner onScanned={handleBarcodeScanned} />
  ) : (
    <View style={styles.container}>
      <View style={styles.touchArea} {...moveTch.panHandlers} />
      <Text>x:{cord[0]} , y:{cord[1]}</Text>
      {serverUrl && <Text>Server: {serverUrl}</Text>}
      <Button title="Scan QR for Server" onPress={() => setShowScanner(true)} />
      <Text>{socketStatus}</Text>
    </View>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    touchArea: {
      height: '50%',
      width: '90%',
      borderStyle: 'solid',
      borderWidth: 1,
      margin: 20,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
  

