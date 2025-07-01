import { stat } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { anvil, mainnet } from 'viem/chains';

export const SIGN_MESSAGE = 'Hello World!';

export const publicClient = createPublicClient({
  chain: anvil,
  transport: http('http://localhost:8545')
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const valid = await publicClient.verifyMessage({
      address: body.address,
      signature: body.signature,
      message: SIGN_MESSAGE
    });
    return NextResponse.json({ data: valid }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
