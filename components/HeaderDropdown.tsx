import { auth } from 'config/firebase';
import { AuthenticatedUserContext } from 'navigation/AuthenticatedUserProvider';
import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { Menu } from 'react-native-paper';
import IconButtonComponent from './IconButton';

const DropdownMenu = ({
  anchor,
  visible,
  closeMenu,
  children,
}: {
  anchor: ReactElement;
  visible: boolean;
  closeMenu: () => void;
  children: React.ReactNode;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={anchor}
        style={{ backgroundColor: '#fff' }}
      >
        {children}
      </Menu>
    </View>
  );
};

const DropdownComponent = () => {
  const { user } = React.useContext(AuthenticatedUserContext);
  const [menuVisible, setMenuVisible] = React.useState(false);

  const handleSignOut = async () => {
    console.log('handling sign out');
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };
  if (!user) {
    return <View>No user!</View>;
  }

  return (
    <DropdownMenu
      anchor={
        <IconButtonComponent
          name="dots-horizontal"
          size={24}
          color="#444"
          onPress={() => setMenuVisible(true)}
          style={{ marginRight: 10 }}
        />
      }
      visible={menuVisible}
      closeMenu={() => setMenuVisible(false)}
    >
      <Menu.Item onPress={handleSignOut} title="Sign out" icon={'logout'} />
    </DropdownMenu>
  );
};

export default DropdownComponent;
