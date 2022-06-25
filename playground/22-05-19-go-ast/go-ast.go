package main

import (
	"go/ast"
	"go/parser"
	"go/token"
	"io/ioutil"
)

func main() {
	filepath := "./account_model"
	content, err := ioutil.ReadFile(filepath)

	if err != nil {
		panic(err)
	}

	fset := token.NewFileSet()
	f, err := parser.ParseFile(fset, "", content, 0)
	if err != nil {
		panic(err)
	}

	ast.Print(fset, f)

}
