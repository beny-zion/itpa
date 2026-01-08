import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const poolsFilePath = path.join(process.cwd(), "src", "data", "pools.json");

async function readPools() {
  const data = await fs.readFile(poolsFilePath, "utf8");
  return JSON.parse(data);
}

async function writePools(pools) {
  await fs.writeFile(poolsFilePath, JSON.stringify(pools, null, 2), "utf8");
}

export async function GET() {
  try {
    const pools = await readPools();
    return NextResponse.json(pools);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read pools" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newPool = await request.json();
    const pools = await readPools();

    // Generate new ID
    const maxId = pools.reduce(
      (max, pool) => Math.max(max, parseInt(pool.id)),
      0
    );
    newPool.id = String(maxId + 1);

    pools.push(newPool);
    await writePools(pools);

    return NextResponse.json(newPool, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create pool" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedPool = await request.json();
    const pools = await readPools();

    const index = pools.findIndex((p) => p.id === updatedPool.id);
    if (index === -1) {
      return NextResponse.json({ error: "Pool not found" }, { status: 404 });
    }

    pools[index] = updatedPool;
    await writePools(pools);

    return NextResponse.json(updatedPool);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update pool" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const pools = await readPools();
    const filteredPools = pools.filter((p) => p.id !== id);

    if (filteredPools.length === pools.length) {
      return NextResponse.json({ error: "Pool not found" }, { status: 404 });
    }

    await writePools(filteredPools);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete pool" }, { status: 500 });
  }
}
