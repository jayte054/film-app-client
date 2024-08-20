import axios from "axios"
import { Base_Url } from "./authStore"

export interface CreateFilmObject {
title: string,
genre: string,
price: string,
description: string,
}

export interface UpdateFilmObject {
  title?: string;
  genre?: string;
  price?: string;
  description?: string;
}

//filmStore endpoint for fetching all films in the store
export const filmStore = async () => {
    const film = await axios.get(`${Base_Url}/film/_getFilm`)
    return film.data
}

//adminFilmStore endpoint for fetching films by the admin
export const adminFilmStore = async (user: string) => {
    // console.log
    const config = {
        headers: {
            'Authorization': `Bearer ${user}`
        }
    }
  const film = await axios.get(`${Base_Url}/film/getFilm`, config);
  return film.data;
};

//createfilm endpoint for creating a film in the filmstore, access only by admin
export const createFilm = async (user: string, createFilmDto: CreateFilmObject) => {
    console.log(createFilmDto, user)
    const config = {
        headers: {
            'Authorization': `Bearer ${user}`
        }
    }
    const film = await axios.post(`${Base_Url}/film/createFilm`, createFilmDto, config)
    return film.data
}

//deleteSingleFilm endpoint for deleting single film
export const deleteSingleFilm = async (user: string, filmId: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    };
    const film = await axios.delete(
      `${Base_Url}/film/deleteFilm/${filmId}`,
      config
    );
    return film.data;
}

//endpoint for updating any single endpoint
export const updateSingleFilm = async (user: string, filmId: string, updateFilmDto: UpdateFilmObject) => {
    console.log(user, filmId, updateFilmDto)
    const config = {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    };
    const film = await axios.patch(
      `${Base_Url}/film/updateFilm/${filmId}`, updateFilmDto,
      config
    );
    console.log("success")
    return film.data;
}

//endpoint for fetching movies by genre
export const getFilmByGenre = async (
  user: string,
  genre: string
) => {
  console.log(user, genre);
  const config = {
    headers: {
      Authorization: `Bearer ${user}`,
    },
  };
  const film = await axios.get(
    `${Base_Url}/film/getFilmByGenre/${genre}`,
    config
  );
  console.log("success");
  console.log(film.data.data)
  return film.data;
};