import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import React, {useState} from 'react';

// Define the response type for the Google API results
interface CityResult {
  formatted_address: string;
}

// Google Places API에서 도시 정보를 가져오는 함수
const fetchCityData = async (cityName: string): Promise<CityResult[]> => {
  const APIKey = 'AIzaSyCrWnDsyD0g1eRejtNBG39RU0OwkZseKMY'; // Google API 키를 여기에 추가하세요
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json`,
    {
      params: {
        address: cityName,
        key: APIKey,
      },
    }
  );
  return response.data.results; // 도시 정보 반환
};

const MapSearch: React.FC = () => {
  const [cityInput, setCityInput] = useState<string>(''); // 입력값 관리
  const [cityName, setCityName] = useState<string>(''); // 검색된 도시 이름 관리

  // 도시 검색 쿼리
  const {data, error, isLoading} = useQuery<CityResult[]>({
    queryKey: ['cityData', cityName], // 쿼리 키
    queryFn: () => fetchCityData(cityName), // 쿼리 함수
    enabled: !!cityName, // cityName이 있을 때만 실행
  });

  // 폼 제출 시 입력값을 설정
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      setCityName(cityInput); // 입력된 도시로 검색 실행
      setCityInput(''); // 입력 필드 초기화
    }
  };

  return (
    <div>
      <h1>City Search</h1>
      {/* 입력 폼 */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={cityInput}
          onChange={e => setCityInput(e.target.value)} // 입력값 상태 업데이트
          placeholder="도시 이름을 입력하세요"
        />
        <button type="submit">검색</button>
      </form>
      {/* 검색 결과 출력 */}
      {isLoading && <div>Loading...</div>}
      {error && <div>Error occurred!</div>}
      {data && (
        <ul>
          {data.map((result: CityResult, index: number) => (
            <li key={index}>{result.formatted_address}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MapSearch;
