import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../../lib/db"; 

export async function POST(req: NextRequest) {
  try {
    const tenderData = await req.json();

    const {
      tender_id,
      tenderer_name,
      evaluation_date,
      evaluation_criteria,
      technical_evaluation,
      financial_evaluation,
      evaluation_score,
      evaluator_name,
      evaluator_position,
      remarks,
    } = tenderData;

    const [existingEvaluations] = await pool.query(
      "SELECT id, evaluation_score FROM tender_evaluations WHERE tender_id = ?",
      [tender_id]
    );

    let bestEvaluationFlag = false;

    const maxScore = Math.max(...existingEvaluations.map((evaluation: any) => evaluation.evaluation_score));
    if (evaluation_score >= maxScore) {
      bestEvaluationFlag = true;
    }

    const query = `
      INSERT INTO tender_evaluations (tender_id, tenderer_name, evaluation_date, evaluation_criteria, 
        technical_evaluation, financial_evaluation, evaluation_score, evaluator_name, evaluator_position, remarks, best_evaluated)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      tender_id,
      tenderer_name,
      evaluation_date,
      evaluation_criteria,
      technical_evaluation,
      financial_evaluation,
      evaluation_score,
      evaluator_name,
      evaluator_position,
      remarks,
      bestEvaluationFlag, 
    ];

    await pool.query(query, values);

    return NextResponse.json(
      { message: "Tender Evaluation Submitted Successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting tender evaluation:", error);
    return NextResponse.json(
      { error: "Failed to submit tender evaluation" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const [results] = await pool.query('SELECT * FROM tender_evaluations');

    return NextResponse.json(results, { status: 200 });
  } catch (err) {
    console.error('Error fetching tenderers:', err);
    return NextResponse.json({ error: 'Failed to fetch tenderers' }, { status: 500 });
  }
}
