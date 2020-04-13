import * as React from 'react';
import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
export declare const renderToJSON: (element: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>) => FileFormat.AnyLayer;
export declare const renderLayers: (layers: any[], container: any) => any;
export declare const render: (element: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>, container?: any) => any;
