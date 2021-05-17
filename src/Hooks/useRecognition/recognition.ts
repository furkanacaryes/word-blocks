export const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export const isSupported = !!SpeechRecognition;

export const error = isSupported ? undefined : `Bu tarayıcıda 'SpeechRecognition' desteklenmiyor!`;

export const recognition = isSupported ? new SpeechRecognition() : ({} as SpeechRecognition);

recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'tr-TR';
recognition.maxAlternatives = 1;
recognition.onspeechend = () => recognition.stop();
