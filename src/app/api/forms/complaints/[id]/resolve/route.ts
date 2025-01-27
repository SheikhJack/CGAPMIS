import  pool  from "../../../../../../../lib/db";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const complaintId = parseInt(params.id);

    if (isNaN(complaintId)) {
      return new Response(JSON.stringify({ error: "Invalid complaint ID." }), {
        status: 400,
      });
    }

    const [result]: any = await pool.query(
      "UPDATE complaints SET status = ? WHERE id = ?",
      ["Resolved", complaintId]
    );

    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({ error: "Complaint not found or already resolved." }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Complaint resolved successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resolving complaint:", error);
    return new Response(
      JSON.stringify({ error: "Failed to resolve complaint." }),
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Allow": "PUT, OPTIONS",
    },
  });
}
