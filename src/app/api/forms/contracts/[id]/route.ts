import  pool  from "../../../../../../lib/db";
import { NextResponse } from "next/server";



export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute("DELETE FROM contracts WHERE id = ?", [id]);

    // Ensure that result is typed correctly
    const affectedRows = (result as { affectedRows: number }).affectedRows;

    await connection.end();

    if (affectedRows === 0) {
      return NextResponse.json({ success: false, message: "Contract not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Contract deleted successfully" });
  } catch (error) {
    console.error("Error deleting contract:", error);
    return NextResponse.json({ success: false, message: "Failed to delete contract" }, { status: 500 });
  }
}

