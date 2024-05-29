import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from "./topicPage.module.scss";
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";

// export const revalidate = 0;

// export const dynamicParams = false; || set this to false iff you dont want to acesss another 
// staticparams except the ones being stated

interface PageProps {
  params: { topicName: string };
  // searchParams: { [key: string]: string | string[] | undefined },
}

export function generateMetadata({ params: { topicName } }: PageProps): Metadata {
  return {
    title: topicName + " - Image Album",
  };
}

export async function generateStaticParams() {
  return ["health", "fitness", "coding"].map((topic) => ({ topic }));
}

export default async function Page({ params: { topicName } }: PageProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topicName}&count=3&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const images: UnsplashImage[] = await response.json();

  return (
    <div>
      <Alert>
        This page uses <strong>generateStaticParams</strong> to render and cache
        static pages at build time, even though the URL has a dynamic parameter.
        Pages that are not included in generateStaticParams will be fetched &
        rendered on first access and then
        <strong>cached for subsequent requests</strong> (this can be disabled).
      </Alert>

      <h1>{topicName}</h1>
      {images.map((image) => (
        <Image
          src={image.urls.raw}
          width={250}
          height={250}
          alt={image.description}
          key={image.urls.raw}
          className={styles.image}
        />
      ))}
    </div>
  );
}
