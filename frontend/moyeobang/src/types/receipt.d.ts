interface BoundingPoly {
  vertices: Array<{ x: number; y: number }>;
}

interface FormattedText {
  value: string;
}

interface OcrApiItem {
  name: {
    text: string;
    formatted: FormattedText;
    keyText: string;
    confidenceScore: number;
    boundingPolys: BoundingPoly[];
    maskingPolys: [];
  };
  count: {
    text: string;
    formatted: FormattedText;
    keyText: string;
    confidenceScore: number;
    boundingPolys: BoundingPoly[];
  };
  price: {
    price: {
      text: string;
      formatted: FormattedText;
      keyText: string;
      confidenceScore: number;
      boundingPolys: BoundingPoly[];
    };
    unitPrice: {
      text: string;
      formatted: FormattedText;
      keyText: string;
      confidenceScore: number;
      boundingPolys: BoundingPoly[];
    };
  };
}

interface SubResult {
  items: OcrItem[];
}
