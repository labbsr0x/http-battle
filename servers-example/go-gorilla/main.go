package main

import (
	"fmt"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"net/http"
	"os"
)

var counter = 0

func PrepareHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	counter = 0
	fmt.Fprintf(w, "%d", counter)
}

func ShootHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	counter += 1
	//go fmt.Printf("%d\n", counter)
	fmt.Fprintf(w, "%d", counter)
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/prepare", PrepareHandler)
	r.HandleFunc("/shoot", ShootHandler)
	port, ok := os.LookupEnv("PORT")
	if !ok {
		port = "9000"
	}
	fmt.Printf("Listen on http://0.0.0.0:%s\n", port)
	http.ListenAndServe(":"+port, handlers.CORS()(r))
}
