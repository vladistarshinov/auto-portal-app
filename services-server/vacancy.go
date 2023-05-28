package services_server

type Vacancy struct {
	Id               int    `json:"id" db:"id"`
	Title            string `json:"title" binding:"required"`
	Department       string `json:"department" binding:"required"`
	Requirements     string `json:"requirements" binding:"required"`
	Responsibilities string `json:"responsibilities" binding:"required"`
	WorkingCondition string `json:"working_condition" binding:"required"`
	ContactPerson    string `json:"contact_person" binding:"required"`
	ContactPhone     string `json:"contact_phone" binding:"required"`
	ContactEmail     string `json:"contact_phone" binding:"required"`
	SalaryFrom       int    `json:"salary_from" binding:"required"`
	SalaryTo         int    `json:"salary_to"`
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
