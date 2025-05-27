import loggingService from '../services/logging';

/**
 * @param actionName - The name of your action in Datadog
 * @param context - The additional attribute data you would like to set.
 * @param version - The version, so that you can filter bugs and changes by version (optional).
 * @param debug - Helper to debug the function locally
 */
export function addRumCustomAction(
  actionName: string,
  context: object,
  version?: string,
  debug: boolean = false,
) {
  const logContext = { actionName, version, ...context };
  const versionedContext = version ? { version, ...context } : context;

  try {
    window.DD_RUM?.addAction(actionName, versionedContext);
    if (debug) {
      loggingService.getLogger().debug('RUM custom action', logContext);
    }
  } catch (error) {
    loggingService.getLogger().error('Error adding RUM custom action', logContext, error as Error);
  }
}

/**
 * Sets a global context property for RUM. Use when you want to save data on a session level
 * @param attributeName - The name of the attribute in datadog
 * @param context - The additional attribute data you would like to set.
 * @param version - The version, so that you can filter bugs and changes by version (optional).
 * @param debug - Helper to debug the function locally
 */
export function setRumGlobalContextProperty(
  attributeName: string,
  context: object,
  version?: string,
  debug: boolean = false,
) {
  const logContext = { attributeName, context, version };
  const versionedContext = version ? { version, ...context } : context;

  try {
    window.DD_RUM?.setGlobalContextProperty(attributeName, versionedContext);
    if (debug) {
      loggingService.getLogger().debug('RUM set global context property', logContext);
    }
  } catch (error) {
    loggingService
      .getLogger()
      .error('Error setting global context property', logContext, error as Error);
  }
}

export function removeRumGlobalContextProperty(
  attributeName: string,
  context: object,
  debug: boolean = false,
) {
  const logContext = { attributeName, context };

  try {
    window.DD_RUM?.removeGlobalContextProperty(attributeName);
    if (debug) {
      loggingService.getLogger().debug('RUM remove global context property', logContext);
    }
  } catch (error) {
    loggingService
      .getLogger()
      .error('Error removing global context property', logContext, error as Error);
  }
}

export function startSessionReplayRecording() {
  try {
    window.DD_RUM?.startSessionReplayRecording();
    loggingService.getLogger().debug('RUM Session Replay Recording started');
  } catch (error) {
    loggingService
      .getLogger()
      .error('Error starting RUM Session Replay Recording', {}, error as Error);
  }
}

export function stopSessionReplayRecording() {
  try {
    window.DD_RUM?.stopSessionReplayRecording();
    loggingService.getLogger().debug('RUM Session Replay Recording stopped');
  } catch (error) {
    loggingService
      .getLogger()
      .error('Error stopping RUM Session Replay Recording', {}, error as Error);
  }
}
