import type { MovieFormInput } from "@/api"

export const movieData = (data: MovieFormInput): FormData => {
    const formData = new FormData()
    formData.append("title", data.title);
    formData.append("plot", data.plot);
    formData.append("duration", data.duration.toString()); 
    formData.append("premiere_date", data.premiere_date.toString());
    formData.append("rated", data.rated);
    formData.append("trailerUrl", data.trailerUrl)
    if (data.filename && data.filename.length > 0) {
        formData.append("filename", data.filename[0]); 
    }
    data.genre_option.forEach((genre) => formData.append("genre_option[]", genre.value))   
    data.actors.forEach((actor) => formData.append("actors[]", actor.value))
    data.directors.forEach((director) => formData.append("directors[]", director.value))

    return formData
}