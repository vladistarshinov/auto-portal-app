package services_server

type VacancyList struct {
	Id         int    `json:"-"`
	Title      string `json:"title"`
	Department string `json:"department"`
	Contacts   string `json:"contacts"`
}

type VacancyDetail struct {
	Id         int    `json:"-"`
	Title      string `json:"title"`
	Department string `json:"department"`
	Contacts   string `json:"contacts"`
}

type UserVacancyApplication struct {
	Id        int
	VacancyId int
	UserId    int
}

type VacancyApplication struct {
	Id    int    `json:"-"`
	Title string `json:"title"`
	Desc  string `json:"desc"`
}
