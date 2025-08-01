// Code generated - EDITING IS FUTILE. DO NOT EDIT.
//
// Generated by:
//     public/app/plugins/gen.go
// Using jennies:
//     TSTypesJenny
//     PluginTsTypesJenny
//
// Run 'make gen-cue' from repository root to regenerate.

import * as ui from '@grafana/schema';

export const pluginVersion = "12.0.2";

export interface Options {
  basemap: ui.MapLayerOptions;
  controls: ControlsOptions;
  layers: Array<ui.MapLayerOptions>;
  tooltip: TooltipOptions;
  view: MapViewConfig;
}

export const defaultOptions: Partial<Options> = {
  layers: [],
};

export interface MapViewConfig {
  allLayers?: boolean;
  id: string;
  lastOnly?: boolean;
  lat?: number;
  layer?: string;
  lon?: number;
  maxZoom?: number;
  minZoom?: number;
  padding?: number;
  shared?: boolean;
  zoom?: number;
}

export const defaultMapViewConfig: Partial<MapViewConfig> = {
  allLayers: true,
  id: 'zero',
  lat: 0,
  lon: 0,
  zoom: 1,
};

export interface ControlsOptions {
  /**
   * let the mouse wheel zoom
   */
  mouseWheelZoom?: boolean;
  /**
   * Lower right
   */
  showAttribution?: boolean;
  /**
   * Show debug
   */
  showDebug?: boolean;
  /**
   * Show measure
   */
  showMeasure?: boolean;
  /**
   * Scale options
   */
  showScale?: boolean;
  /**
   * Zoom (upper left)
   */
  showZoom?: boolean;
}

export interface TooltipOptions {
  mode: TooltipMode;
}

export enum TooltipMode {
  Details = 'details',
  None = 'none',
}

export enum MapCenterID {
  Coords = 'coords',
  Fit = 'fit',
  Zero = 'zero',
}
