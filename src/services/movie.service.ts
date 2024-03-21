import { PAGE_SIZE, Status } from "@/constants";
import mongodb from "@/lib/mongodb";
import { MovieModel } from "@/models";
import { MovieSchema } from "@/types";
import { FilterQuery } from "mongoose";

export const fetchMovies = async (
  page = "1",
  filtered: FilterQuery<MovieSchema> = {},
  pageSize = PAGE_SIZE
) => {
  try {
    await mongodb();

    const pageNumber = parseInt(page) || 1;

    if (pageNumber < 1) throw Error("Page must be greater than 0");

    const totalMovies = await MovieModel.countDocuments(filtered).lean();
    const totalPages = Math.ceil(totalMovies / pageSize);

    if (totalPages === 0) return { movies: [], totalPages: 1, totalMovies };
    if (totalPages < pageNumber) throw Error("Page not found");

    const skip = (pageNumber - 1) * pageSize;

    const movies = await MovieModel.find(filtered)
      .find({ status: { $ne: Status.Trailer }, ...filtered })
      .sort({ updatedAt: "desc" })
      .select(" name slug poster backdropColor")
      .skip(skip)
      .limit(pageSize)
      .lean();

    return { movies, totalPages, totalMovies };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching movies");
  }
};

export const fetchRandomMovies = async (
  filtered: FilterQuery<MovieSchema> = {},
  size = 6
) => {
  await mongodb();

  return MovieModel.aggregate([
    { $match: filtered },
    { $sample: { size } },
    { $project: { name: 1, poster: 1, slug: 1, backdropColor: 1 } },
  ]);
};
