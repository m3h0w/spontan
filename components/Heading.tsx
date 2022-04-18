import { TextProps } from 'react-native';
import { Headline } from 'react-native-paper';
import { scaled } from 'styles/scaled';

const Heading = (props: TextProps) => {
  return (
    <Headline
      {...props}
      style={{
        fontSize: scaled(25),
        fontWeight: 'bold',
        lineHeight: scaled(25),
        ...(props.style as any),
      }}
    >
      {props.children}
    </Headline>
  );
};

export default Heading;
