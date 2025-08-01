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

/**
 * Controls the color mode of the heatmap
 */
export enum HeatmapColorMode {
  Opacity = 'opacity',
  Scheme = 'scheme',
}

/**
 * Controls the color scale of the heatmap
 */
export enum HeatmapColorScale {
  Exponential = 'exponential',
  Linear = 'linear',
}

/**
 * Controls which axis to allow selection on
 */
export enum HeatmapSelectionMode {
  X = 'x',
  Xy = 'xy',
  Y = 'y',
}

/**
 * Controls various color options
 */
export interface HeatmapColorOptions {
  /**
   * Controls the exponent when scale is set to exponential
   */
  exponent: number;
  /**
   * Controls the color fill when in opacity mode
   */
  fill: string;
  /**
   * Sets the maximum value for the color scale
   */
  max?: number;
  /**
   * Sets the minimum value for the color scale
   */
  min?: number;
  /**
   * Sets the color mode
   */
  mode?: HeatmapColorMode;
  /**
   * Reverses the color scheme
   */
  reverse: boolean;
  /**
   * Controls the color scale
   */
  scale?: HeatmapColorScale;
  /**
   * Controls the color scheme used
   */
  scheme: string;
  /**
   * Controls the number of color steps
   */
  steps: number;
}

/**
 * Configuration options for the yAxis
 */
export interface YAxisConfig extends ui.AxisConfig {
  /**
   * Controls the number of decimals for yAxis values
   */
  decimals?: number;
  /**
   * Sets the maximum value for the yAxis
   */
  max?: number;
  /**
   * Sets the minimum value for the yAxis
   */
  min?: number;
  /**
   * Reverses the yAxis
   */
  reverse?: boolean;
  /**
   * Sets the yAxis unit
   */
  unit?: string;
}

/**
 * Controls cell value options
 */
export interface CellValues {
  /**
   * Controls the number of decimals for cell values
   */
  decimals?: number;
  /**
   * Controls the cell value unit
   */
  unit?: string;
}

/**
 * Controls the value filter range
 */
export interface FilterValueRange {
  /**
   * Sets the filter range to values greater than or equal to the given value
   */
  ge?: number;
  /**
   * Sets the filter range to values less than or equal to the given value
   */
  le?: number;
}

/**
 * Controls tooltip options
 */
export interface HeatmapTooltip {
  maxHeight?: number;
  maxWidth?: number;
  /**
   * Controls how the tooltip is shown
   */
  mode: ui.TooltipDisplayMode;
  /**
   * Controls if the tooltip shows a color scale in header
   */
  showColorScale?: boolean;
  /**
   * Controls if the tooltip shows a histogram of the y-axis values
   */
  yHistogram?: boolean;
}

/**
 * Controls legend options
 */
export interface HeatmapLegend {
  /**
   * Controls if the legend is shown
   */
  show: boolean;
}

/**
 * Controls exemplar options
 */
export interface ExemplarConfig {
  /**
   * Sets the color of the exemplar markers
   */
  color: string;
}

/**
 * Controls frame rows options
 */
export interface RowsHeatmapOptions {
  /**
   * Controls tick alignment when not calculating from data
   */
  layout?: ui.HeatmapCellLayout;
  /**
   * Sets the name of the cell when not calculating from data
   */
  value?: string;
}

export interface Options {
  /**
   * Controls if the heatmap should be calculated from data
   */
  calculate?: boolean;
  /**
   * Calculation options for the heatmap
   */
  calculation?: ui.HeatmapCalculationOptions;
  /**
   * Controls gap between cells
   */
  cellGap?: number;
  /**
   * Controls cell radius
   */
  cellRadius?: number;
  /**
   * Controls cell value unit
   */
  cellValues?: CellValues;
  /**
   * Controls the color options
   */
  color: HeatmapColorOptions;
  /**
   * Controls exemplar options
   */
  exemplars: ExemplarConfig;
  /**
   * Filters values between a given range
   */
  filterValues?: FilterValueRange;
  /**
   * | *{
   * 	axisPlacement: ui.AxisPlacement & "left" // TODO: fix after remove when https://github.com/grafana/cuetsy/issues/74 is fixed
   * }
   * Controls legend options
   */
  legend: HeatmapLegend;
  /**
   * Controls tick alignment and value name when not calculating from data
   */
  rowsFrame?: RowsHeatmapOptions;
  /**
   * Controls which axis to allow selection on
   */
  selectionMode?: HeatmapSelectionMode;
  /**
   * | *{
   * 	layout: ui.HeatmapCellLayout & "auto" // TODO: fix after remove when https://github.com/grafana/cuetsy/issues/74 is fixed
   * }
   * Controls the display of the value in the cell
   */
  showValue: ui.VisibilityMode;
  /**
   * Controls tooltip options
   */
  tooltip: HeatmapTooltip;
  /**
   * Controls yAxis placement
   */
  yAxis: YAxisConfig;
}

export const defaultOptions: Partial<Options> = {
  calculate: false,
  cellGap: 1,
  cellValues: {},
  color: {
    /**
     * mode:     HeatmapColorMode // TODO: fix after remove when https://github.com/grafana/cuetsy/issues/74 is fixed
     */
    scheme: 'Oranges',
    fill: 'dark-orange',
    /**
     * scale:    HeatmapColorScale // TODO: fix after remove when https://github.com/grafana/cuetsy/issues/74 is fixed
     */
    reverse: false,
    exponent: 0.5,
    steps: 64,
  },
  exemplars: {
    color: 'rgba(255,0,255,0.7)',
  },
  filterValues: {
    le: 1e-09,
  },
  legend: {
    show: true,
  },
  selectionMode: HeatmapSelectionMode.X,
  showValue: ui.VisibilityMode.Auto,
  tooltip: {
    mode: ui.TooltipDisplayMode.Single,
    yHistogram: false,
    showColorScale: false,
  },
};

export interface FieldConfig extends ui.HideableFieldConfig {
  scaleDistribution?: ui.ScaleDistributionConfig;
}
