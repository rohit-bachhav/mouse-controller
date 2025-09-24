import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Text } from 'react-native';
import { useEffect } from 'react';
type Props = {
  onScanned: (data: string) => void;
};

export default function BarcodeScanner({ onScanned }: Props) {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission || permission.status !== 'granted') {
    return <Text>No camera permission</Text>;
  }

  return (
    <CameraView
      style={{ flex: 1 }}
      facing={'back'}
      barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
      onBarcodeScanned={({ data }) => onScanned(data)}
    />
  );
}