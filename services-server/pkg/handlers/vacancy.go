package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type getAllListsResponse struct {
	Data []vacancy.Vacancy `json:"data"`
}

func (h *Handler) getAllVacancies(ctx *gin.Context) {
	vacancies, err := h.services.VacancyList.GetAll()
	if err != nil {
		newErrorResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, getAllListsResponse{
		Data: vacancies,
	})
}
