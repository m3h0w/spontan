import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, ImageBackground, View } from 'react-native';
import EventPlaceholderImage from 'assets/images/eventPlaceholder.jpg';

// Constants
const PATH = '//source.unsplash.com';
const USER = 'user';
const COLLECTION = 'collection';
const DAILY = 'daily';
const RANDOM = 'random';
const WIDTH = 1080;
const HEIGHT = 720;
const DEFAULT_STYLES = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
const EXPAND_STYLES = {
  position: 'absolute',
  top: 0,
  right: 0,
  //   bottom: 0,
  left: 0,
  margin: 0,
};

// Helper to generate url for unsplash
const generateUrl = ({
  username,
  width,
  height,
  photoId,
  collectionId,
  keywords,
  fixed,
}) => {
  const url = [PATH];

  if (fixed) return [...url, DAILY].join('/');

  if (username) url.push(USER, username);
  if (!username && collectionId) url.push(COLLECTION, collectionId);
  if (!username && !collectionId && photoId) url.push(photoId);
  if (!username && !photoId && !collectionId && !keywords) url.push(RANDOM);

  url.push(`${width}x${height}`);

  if (keywords) url.push(`?${keywords.replace(/\s/g, '')}`);

  return url.join('/');
};

const Unsplash = ({
  children,
  photoId,
  collectionId,
  username,
  expand,
  fixed,
  img,
  keywords,
  style,
  width,
  height,
  onUrlChange,
}) => {
  const [url, setUrl] = useState('');
  if (typeof width === 'string') width = parseInt(width, 10);
  if (typeof height === 'string') height = parseInt(height, 10);

  const urlWidth = useMemo(() => (style && style.width) || width, [width]);
  const urlHeight = useMemo(() => (style && style.height) || height, [height]);

  useEffect(() => {
    const url = encodeURI(
      generateUrl({
        username,
        collectionId,
        photoId,
        keywords: keywords.split(' ')[0],
        fixed,
        width: urlWidth,
        height: urlHeight,
      }),
    );
    setUrl(url);
  }, [username, collectionId, photoId, keywords, fixed, urlWidth, urlHeight]);

  useEffect(() => {
    if (onUrlChange) onUrlChange(url);
  }, [url, onUrlChange]);

  let imageStyles = {
    width,
    height,
    ...style,
  };

  let backgroundStyles = {
    ...DEFAULT_STYLES,
  };

  if (expand) {
    backgroundStyles = { ...backgroundStyles, ...EXPAND_STYLES };
  } else {
    backgroundStyles = {
      ...backgroundStyles,
      width,
      height,
      ...style,
    };
  }

  return img ? (
    <Image
      source={{ uri: url }}
      style={imageStyles}
      defaultSource={EventPlaceholderImage}
    />
  ) : (
    <ImageBackground
      style={backgroundStyles}
      source={{ uri: url }}
      defaultSource={EventPlaceholderImage}
    >
      {children}
    </ImageBackground>
  );
};

Unsplash.propTypes = {
  children: PropTypes.node,
  collectionId: PropTypes.number,
  username: PropTypes.string,
  keywords: PropTypes.string,
  expand: PropTypes.bool,
  fixed: PropTypes.bool,
  img: PropTypes.bool,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Unsplash.defaultProps = {
  expand: false,
  fixed: false,
  img: false,
  width: WIDTH,
  height: HEIGHT,
};

export default Unsplash;
