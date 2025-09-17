import ImageKit from "imagekit";

// Initialize ImageKit instance with credentials from environment variables
var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,    // Public key for client-side operations
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,  // Private key for server-side operations
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT // Base URL for uploaded images
});

// Export the configured instance to use in routes/controllers
export default imagekit;
