import { useNavigation } from '@react-navigation/native';
import { firestore } from 'config/firebase';
import { useEffect } from 'react';

const useForceNavigateToFirstItem = () => {
  const nav = useNavigation();

  useEffect(() => {
    // Uncomment to work on the Item screen
    const f = async () => {
      const items = await firestore.getItems();
      nav.navigate('Item' as never, { item: items[0] } as never);
    };
    f();
  }, []);
};

export default useForceNavigateToFirstItem;
