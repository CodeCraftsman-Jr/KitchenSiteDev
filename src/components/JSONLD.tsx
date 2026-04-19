import { useEffect } from "react";

type JSONLDProps = {
  id: string;
  data: Record<string, unknown>;
};

const JSONLD = ({ id, data }: JSONLDProps) => {
  useEffect(() => {
    const scriptId = `jsonld-${id}`;
    const existing = document.getElementById(scriptId);
    if (existing) {
      existing.remove();
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      const element = document.getElementById(scriptId);
      if (element) {
        element.remove();
      }
    };
  }, [id, data]);

  return null;
};

export default JSONLD;
