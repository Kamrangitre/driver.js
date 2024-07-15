import { DriveStep } from "./driver";
import { AllowedButtons, PopoverDOM } from "./popover";
import { State } from "./state";

export type DriverHook = (element: Element | undefined, step: DriveStep, opts: { config: Config; state: State }) => void;

export type Config = {
  steps?: DriveStep[];

  animate?: boolean;
  animateBetweenSameElements?: boolean
  overlayEnable?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  smoothScroll?: boolean;
  allowClose?: boolean;
  allowScroll?: boolean;
  stagePadding?: number;
  stageRadius?: number;

  disableActiveInteraction?: boolean;

  allowKeyboardControl?: boolean;

  // Popover specific configuration
  popoverClass?: string;
  popoverOffset?: number;
  popoverStickToViewport?: boolean;
  showButtons?: AllowedButtons[];
  disableButtons?: AllowedButtons[];
  showProgress?: boolean;

  // Button texts
  progressText?: string;
  nextBtnText?: string;
  prevBtnText?: string;
  doneBtnText?: string;

  // Called after the popover is rendered
  onPopoverRender?: (popover: PopoverDOM, opts: { config: Config; state: State }) => void;

  // State based callbacks, called upon state changes
  onHighlightStarted?: DriverHook;
  onHighlighted?: DriverHook;
  onDeselected?: DriverHook;
  onDestroyStarted?: DriverHook;
  onDestroyed?: DriverHook;

  // Event based callbacks, called upon events
  onNextClick?: DriverHook;
  onPrevClick?: DriverHook;
  onCloseClick?: DriverHook;
};

let currentConfig: Config = {};

export function configure(config: Config = {}) {
  currentConfig = {
    animate: true,
    animateBetweenSameElements: true,
    allowClose: true,
    allowScroll: true,
    overlayOpacity: 0.7,
    overlayEnable: true,
    smoothScroll: false,
    disableActiveInteraction: false,
    showProgress: false,
    stagePadding: 10,
    stageRadius: 5,
    popoverOffset: 10,
    popoverStickToViewport: true,
    showButtons: ["next", "previous", "close"],
    disableButtons: [],
    overlayColor: "#000",
    ...config,
  };
}

export function getConfig(): Config;
export function getConfig<K extends keyof Config>(key: K): Config[K];
export function getConfig<K extends keyof Config>(key?: K) {
  return key ? currentConfig[key] : currentConfig;
}
