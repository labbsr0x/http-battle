package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
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
	http.ListenAndServe(":3000", handlers.CORS()(r))
}
