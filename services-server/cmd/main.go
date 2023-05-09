package main

import (
	"github.com/vladistarshinov/auto-portal-app/services-server"
	"log"
)

func main() {
	srv := new(services_server.Server)
	if err := srv.Run("8000"); err != nil {
		log.Fatalf("server error: %s", err.Error())
	}
}
