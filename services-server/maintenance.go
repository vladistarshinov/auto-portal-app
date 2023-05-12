package services_server

type MaintenanceList struct {
	Id    int    `json:"-"`
	Title string `json:"title"`
	Slug  string `json:"slug"`
	Type  string `json:"type"`
}

type MaintenanceListItems struct {
	Id                int
	MaintenanceId     int
	MaintenanceItemId int
}

type MaintenanceItem struct {
	Id    int    `json:"-"`
	Title string `json:"title"`
	Slug  string `json:"slug"`
	Info  string `json:"type"`
	Brand string `json:"brand"`
	Model string `json:"model"`
}

type UserMaintenanceApplications struct {
	Id                int
	UserId            int
	MaintenanceItemId int
}

type MaintenanceApplication struct {
	Id   int    `json:"-"`
	Desc string `json:"desc"`
}
