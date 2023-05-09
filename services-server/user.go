package services_server

type User struct {
	Id        int    `json:"-"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}
