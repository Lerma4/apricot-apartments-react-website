export const loader = () => {
    return new Response(null, {
      status: 204,
      headers: {
        "Cache-Control": "public, max-age=31536000",
      },
    });
  };
  
