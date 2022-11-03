import { useEffect, useState } from 'react';

type SessionProperties = {
  sessionId: number;
  puzzle: string;
};

// const tSessionProperties = <Type extends keyof SessionProperties>(
//   ...args: Extract<SessionProperties, Type> extends {payload: infer TPayload}
//   ? [type: Type, payload: TPayload]
//   : [Type]
// ) => {

// }
const LOCAL_STORAGE_KEY = 'properties';

export default function useSessionProperties<K extends keyof SessionProperties>(
  property: keyof SessionProperties,
) {
  const [properties, setProperties] = useState<SessionProperties>(() => {
    const storedProperties = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedProperties) {
      try {
        return JSON.parse(storedProperties);
      } catch {}
    }
    return {
      sessionId: 1,
      puzzle: '333',
    };
  });

  const setPropertyValue = (value: SessionProperties[K]) => {
    const newProperties = {
      ...properties,
      [property]: value,
    };
    setProperties(newProperties);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(properties));
  }, [properties, property]);

  return [properties[property], setPropertyValue] as const;
}
