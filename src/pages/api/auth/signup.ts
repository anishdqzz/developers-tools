import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export const POST = async ({ request }: { request: Request }) => {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({ message: 'Username, email and password are required' }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('test');
    const users = db.collection('users');

    const existingUserByEmail = await users.findOne({ email });
    if (existingUserByEmail) {
      return new Response(JSON.stringify({ message: 'User with this email already exists' }), {
        status: 409,
      });
    }

    const existingUserByUsername = await users.findOne({ username });
    if (existingUserByUsername) {
      return new Response(JSON.stringify({ message: 'Username is already taken' }), {
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await users.insertOne({
      username,
      email,
      password: hashedPassword,
    });

    return new Response(JSON.stringify({ message: 'User created successfully' }), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    });
  }
};
