import type {RefObject} from "react";
import {useCallback, useEffect} from "react";

export default function useOnClickOutside(ref: RefObject<HTMLElement>, callback: VoidFunction) {

  const handleClickOutside = useCallback((event: MouseEvent) => {
    // ref : 참조된 엘리먼트 // event.target:클릭된DOM노드 / event.target이 ref 엘리멘트에 포함되어 있는지
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  }, [callback, ref])

  useEffect(() => {
    // 마우스 클릭한 후 뗄 때 handleClickOutside 실행됨.
    document.addEventListener('mouseup', handleClickOutside);

    // return () => {} : 언마운트될때 실행됨.
    return () => {
      // 컴포넌트가 언마운트 될 때 제거.
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [handleClickOutside]);
}