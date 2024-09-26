package com.ssafy.moyeobang.travel.adapter.in.web.request;

import java.time.LocalDate;
import java.util.List;

public record CreateTravelRequest(String travelName,
                                  LocalDate startDate,
                                  LocalDate endDate,
                                  List<String> travelPlaceList,
                                  String quizQuestion,
                                  String quizAnswer) {
}
