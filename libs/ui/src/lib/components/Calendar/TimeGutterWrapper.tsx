import React from 'react';

const TimeGutterWrapper: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) =>
  React.cloneElement(React.Children.only(children as React.ReactElement), {});

export default TimeGutterWrapper;
