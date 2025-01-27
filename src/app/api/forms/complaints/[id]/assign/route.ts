import  pool  from "../../../../../../../lib/db";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const complaintId = parseInt(params.id);
    const { officer } = await req.json();

    // Validate the request
    if (isNaN(complaintId)) {
      return new Response(JSON.stringify({ error: "Invalid complaint ID." }), {
        status: 400,
      });
    }

    if (!officer || typeof officer !== "string") {
      return new Response(JSON.stringify({ error: "Officer name is required." }), {
        status: 400,
      });
    }

    // Update the complaint to assign the officer
    const [result]: any = await pool.query(
      "UPDATE complaints SET officer = ?, status = ? WHERE id = ?",
      [officer, "In Progress", complaintId]
    );

    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({ error: "Complaint not found or already assigned." }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Officer assigned successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error assigning officer:", error);
    return new Response(
      JSON.stringify({ error: "Failed to assign officer." }),
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
