import {
  require_react
} from "./chunk-44N2SFQY.js";
import {
  __publicField,
  __toESM
} from "./chunk-CLC6CPQL.js";

// node_modules/react-error-boundary/dist/react-error-boundary.module.js
var import_react = __toESM(require_react());
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, { get: v, set: s, enumerable: true, configurable: true });
}
var $44d7e150ebc754d2$exports = {};
$parcel$export($44d7e150ebc754d2$exports, "ErrorBoundary", () => $44d7e150ebc754d2$export$e926676385687eaf);
var $ebb31c7feaa4405e$exports = {};
$parcel$export($ebb31c7feaa4405e$exports, "ErrorBoundaryContext", () => $ebb31c7feaa4405e$export$b16d9fb1a22de840);
var $ebb31c7feaa4405e$export$b16d9fb1a22de840 = (0, import_react.createContext)(null);
var $44d7e150ebc754d2$var$initialState = {
  didCatch: false,
  error: null
};
var $44d7e150ebc754d2$export$e926676385687eaf = class extends (0, import_react.Component) {
  constructor() {
    super(...arguments);
    __publicField(this, "state", $44d7e150ebc754d2$var$initialState);
    __publicField(this, "resetErrorBoundary", (...args) => {
      var _a, _b;
      const { error } = this.state;
      if (error !== null) {
        (_b = (_a = this.props).onReset) == null ? void 0 : _b.call(_a, {
          args,
          reason: "imperative-api"
        });
        this.setState($44d7e150ebc754d2$var$initialState);
      }
    });
  }
  static getDerivedStateFromError(error) {
    return {
      didCatch: true,
      error
    };
  }
  componentDidCatch(error, info) {
    var _a, _b;
    (_b = (_a = this.props).onError) == null ? void 0 : _b.call(_a, error, info);
  }
  componentDidUpdate(prevProps, prevState) {
    var _a, _b;
    const { didCatch } = this.state;
    const { resetKeys } = this.props;
    if (didCatch && prevState.error !== null && $44d7e150ebc754d2$var$hasArrayChanged(prevProps.resetKeys, resetKeys)) {
      (_b = (_a = this.props).onReset) == null ? void 0 : _b.call(_a, {
        next: resetKeys,
        prev: prevProps.resetKeys,
        reason: "keys"
      });
      this.setState($44d7e150ebc754d2$var$initialState);
    }
  }
  render() {
    const { children, fallbackRender, FallbackComponent, fallback } = this.props;
    const { didCatch, error } = this.state;
    let childToRender = children;
    if (didCatch) {
      const props = {
        error,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if ((0, import_react.isValidElement)(fallback))
        childToRender = fallback;
      else if (typeof fallbackRender === "function")
        childToRender = fallbackRender(props);
      else if (FallbackComponent)
        childToRender = (0, import_react.createElement)(FallbackComponent, props);
      else
        throw new Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop");
    }
    return (0, import_react.createElement)((0, $ebb31c7feaa4405e$export$b16d9fb1a22de840).Provider, {
      value: {
        didCatch,
        error,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, childToRender);
  }
};
function $44d7e150ebc754d2$var$hasArrayChanged(a = [], b = []) {
  return a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]));
}
var $7c3c25b3f398a9d6$exports = {};
$parcel$export($7c3c25b3f398a9d6$exports, "useErrorBoundary", () => $7c3c25b3f398a9d6$export$c052f6604b7d51fe);
function $75c9d331f9c1ed1a$export$f20aa86254872370(value) {
  if (value == null || typeof value.didCatch !== "boolean" || typeof value.resetErrorBoundary !== "function")
    throw new Error("ErrorBoundaryContext not found");
  return true;
}
function $7c3c25b3f398a9d6$export$c052f6604b7d51fe() {
  const context = (0, import_react.useContext)((0, $ebb31c7feaa4405e$export$b16d9fb1a22de840));
  (0, $75c9d331f9c1ed1a$export$f20aa86254872370)(context);
  const [state, setState] = (0, import_react.useState)({
    error: null,
    hasError: false
  });
  const memoized = (0, import_react.useMemo)(() => ({
    resetBoundary: () => {
      context == null ? void 0 : context.resetErrorBoundary();
      setState({
        error: null,
        hasError: false
      });
    },
    showBoundary: (error) => setState({
      error,
      hasError: true
    })
  }), [
    context == null ? void 0 : context.resetErrorBoundary
  ]);
  if (state.hasError)
    throw state.error;
  return memoized;
}
var $62ff477d53f02a5b$exports = {};
$parcel$export($62ff477d53f02a5b$exports, "withErrorBoundary", () => $62ff477d53f02a5b$export$f0c7a449e0cfaec7);
function $62ff477d53f02a5b$export$f0c7a449e0cfaec7(component, errorBoundaryProps) {
  const Wrapped = (0, import_react.forwardRef)((props, ref) => (0, import_react.createElement)((0, $44d7e150ebc754d2$export$e926676385687eaf), errorBoundaryProps, (0, import_react.createElement)(component, {
    ...props,
    ref
  })));
  const name = component.displayName || component.name || "Unknown";
  Wrapped.displayName = `withErrorBoundary(${name})`;
  return Wrapped;
}
export {
  $44d7e150ebc754d2$export$e926676385687eaf as ErrorBoundary,
  $ebb31c7feaa4405e$export$b16d9fb1a22de840 as ErrorBoundaryContext,
  $7c3c25b3f398a9d6$export$c052f6604b7d51fe as useErrorBoundary,
  $62ff477d53f02a5b$export$f0c7a449e0cfaec7 as withErrorBoundary
};
//# sourceMappingURL=react-error-boundary.js.map
