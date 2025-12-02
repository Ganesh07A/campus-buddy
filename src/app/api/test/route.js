export async function POST(req) {
  try {
    const body = await req.json();

    return Response.json({
      message: "Data received successfully!",
      data: body,
    });

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
