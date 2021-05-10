/**
 * Prompts user for microphone permission only if permission state is `prompt`.
 * @returns {Promise<boolean>} Whether the microphone permission is `granted`
 */
export const askPermissionSafe = async (): Promise<boolean> => {
  return navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(() => true)
    .catch(() => false);
};

/**
 * Queries Permissions API for 'microphone' permission status.
 * @returns {Promise<PermissionStatus>} PermissionStatus for 'microphone'
 */
export const queryMicrophonePermission = async (): Promise<PermissionStatus> => {
  return navigator.permissions.query({ name: 'microphone' }).catch((originalError) => {
    throw {
      message: `Couldn't query the 'microphone' permission on this browser.`,
      originalError,
    };
  });
};
