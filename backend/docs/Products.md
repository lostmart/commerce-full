# Overview

## Product shema

Each product has a very specific schema that looks as follows:

- productName: { type: String, required: true }
- productPrice: { type: Number, required: true }
- productTags: { type: Array, required: true }
- productImages: { type: Array}

## Requirements

In order to create a product you need to have a validated user and also need to be logged-in
You can upload any number of photos of the procuct you want, but each photo need to be up to 1 Mb
The picture formats can be jpeg, jpg, png or webp

## Product Tags

You can select from a numlber of tags and you can add up to three of them

## Product Description

Anything you want to say about your products

## Product price

The price is an integer created in cents
