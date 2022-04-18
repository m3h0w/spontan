import * as React from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

type Props = {
  visible: boolean;
  hideDialog: () => void;
  info: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
};

const CustomDialog: React.FC<Props> = ({
  visible,
  hideDialog,
  info,
  onConfirm,
  confirmText,
  cancelText,
}) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        style={{ backgroundColor: '#fff' }}
      >
        <Dialog.Title>Careful</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{info}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog} mode="contained">
            {cancelText ?? 'Cancel'}
          </Button>
          <Button
            mode="outlined"
            onPress={() => {
              hideDialog();
              onConfirm && onConfirm();
            }}
            style={{ marginLeft: 10 }}
          >
            {confirmText ?? 'OK'}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomDialog;
