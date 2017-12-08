package main

import (
	"fmt"
	"os"

	"github.com/buaazp/fasthttprouter"
	"github.com/valyala/fasthttp"
)

var counter = 0

func prepareHandler(ctx *fasthttp.RequestCtx) {
	counter = 0
	fmt.Fprintf(ctx, "%d", counter)
}

func shootHandler(ctx *fasthttp.RequestCtx) {
	counter += 1
	//go fmt.Printf("%d\n", counter)
	fmt.Fprintf(ctx, "%d", counter)
}

func main() {
	port, ok := os.LookupEnv("PORT")
	if !ok {
		port = "9000"
	}
	fmt.Printf("Listen on http://0.0.0.0:%s\n", port)

	router := fasthttprouter.New()
	router.GET("/prepare", prepareHandler)
	router.GET("/shoot", shootHandler)
	fasthttp.ListenAndServe(":"+port, router.Handler)
}
