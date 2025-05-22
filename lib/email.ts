export function generateNewsLetterHTML(
  title: string,
  description: string,
  email: string,
  slug: string
) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const blogUrl = `${baseUrl}/blogs/${slug}`;
  const unsubscribeUrl = `${baseUrl}/api/unsubscribe?email=${encodeURIComponent(
    email
  )}`;

  return {
    html: `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Blog Post: ${title}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
  <div style="background-color: #fff; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
    <h1 style="color: #2b2d42; text-align: left;">New Blog Post</h1>
    <h2 style="color: #333;">${title}</h2>
    <p style="font-size: 16px; color: #555;">${description}</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${blogUrl}" style="display: inline-block; background-color: #0070f3; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
        Read Full Post
      </a>
    </div>
    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
    <p style="font-size: 12px; color: #999; text-align: left;">
      You're receiving this email because you subscribed to updates from s5.<br />
      <a href="${unsubscribeUrl}" style="color: #0070f3; text-decoration: underline;">Unsubscribe</a>
    </p>
  </div>
</body>
</html>
    `,
    text: `
    New Blog Post: ${title}
    ${description}
    Read Full Post: ${blogUrl}
    You're receiving this email because you subscribed to updates from BlogApp.
    To Unsubscribe, visit: ${unsubscribeUrl}
    `,
  };
}
