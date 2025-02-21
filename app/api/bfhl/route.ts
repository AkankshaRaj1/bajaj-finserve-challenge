import { NextResponse } from "next/server";
import { userData } from "@/app/data";

export async function POST(req: Request) {
    try {
        const { data } = await req.json();

        if (!Array.isArray(data)) {
            return NextResponse.json(
                { is_success: false, message: "Invalid data format" },
                { status: 400 }
            );
        }

        const numbers = data.filter((item) => typeof item === "string" && !isNaN(Number(item)));
        const alphabets = data.filter((item) => typeof item === "string" && /^[a-zA-Z]$/.test(item));

        const lowercaseAlphabets = alphabets.filter((char) => /^[a-z]$/.test(char));

        const highestLowercaseAlphabet =
            lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop() as string] : [];

        const response = {
            is_success: true,
            user_id: userData?.user_id,
            email: userData?.email,
            roll_number: userData?.roll_number,
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet,
        };

        console.log(response);
        return NextResponse.json(response);
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { is_success: false, message: "Server error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ operation_code: 1 });
}
