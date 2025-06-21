import type { APIRoute } from "astro"
import { searchGames } from "../../services/games.js"


export const GET: APIRoute = async ({ request }) => {
  try {
    const params = new URL(request.url).searchParams
    const getName = params.get("name")

    if (!getName) {
      return new Response(JSON.stringify({ error: "we need a game name" }), { status: 400, statusText: "bad request" })
    }

    const getGames = await searchGames(getName)

    return new Response(JSON.stringify(getGames), {
      status: 200,
      statusText: "OK!",
      headers: {
        "Content-Type": "application/json"
      }
    })
  } catch (error) {

    console.error("Error de servidor: ", error)

    return new Response(JSON.stringify({ error: "we had an error, try later" }), { status: 500, statusText: "server error", headers: { "Content-Type": "application/json" } })
  }

}