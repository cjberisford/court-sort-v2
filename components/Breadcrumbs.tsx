import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const convertBreadcrumb = string => {
  return string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .toUpperCase();
};

const Breadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav aria-label="breadcrumbs">
      <ol className="my-4 inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center text-sm font-medium ">
          <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          <a href="/">HOME</a>
        </li>
        {breadcrumbs.map((breadcrumb, i) => {
          return (
            <li className="inline-flex items-center" key={breadcrumb.href}>
              <Link href={breadcrumb.href} legacyBehavior>
                <a className="inline-flex items-center text-sm font-medium ">
                  <svg className="w-3 h-3 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                  </svg>
                  {convertBreadcrumb(breadcrumb.breadcrumb)}
                </a>
              </Link>
            </li>
          );
        })}
      </ol>
      <style jsx>{`
    .breadcrumb {
      list-style: none;
      overflow: hidden;
      font: 16px Sans-Serif;
    }
    .breadcrumb li {
      float: left;
    }
    .breadcrumb li a {
      color: rgb(0, 0, 0);
      text-decoration: none;
      padding: 10px 0 10px 50px;
      background: rgb(230, 224, 224);
      position: relative;
      display: block;
      float: left;
    }
    
    .breadcrumb li a::after {
      content: ' ';
      display: block;
      width: 0;
      height: 0;
      border-top: 50px solid transparent; /* Go big on the size, and let overflow hide */
      border-bottom: 50px solid transparent;
      border-left: 30px solid rgb(230, 224, 224);
      position: absolute;
      top: 50%;
      margin-top: -50px;
      left: 100%;
      z-index: 2;
    }
    
    .breadcrumb li a::before {
      content: ' ';
      display: block;
      width: 0;
      height: 0;
      border-top: 50px solid transparent;
      border-bottom: 50px solid transparent;
      border-left: 30px solid white;
      position: absolute;
      top: 50%;
      margin-top: -50px;
      margin-left: 1px;
      left: 100%;
      z-index: 1;
    }
    
    .breadcrumb li:first-child a {
      padding-left: 20px;
      pointer-events: visible !important;
      cursor: pointer !important;
    }
    .breadcrumb li:nth-child(2) a {
      background: rgb(224, 233, 233);
    }
    .breadcrumb li:nth-child(2) a:after {
      border-left-color: rgb(224, 233, 233);
    }
    .breadcrumb li:nth-child(3) a {
      background: rgb(224, 233, 233);
    }
    .breadcrumb li:nth-child(3) a:after {
      border-left-color: rgb(224, 233, 233);
    }
    .breadcrumb li:nth-child(4) a {
      background: rgb(224, 233, 233);
    }
    .breadcrumb li:nth-child(4) a:after {
      border-left-color: rgb(224, 233, 233);
    }
    .breadcrumb li:nth-child(5) a {
      background: rgb(224, 233, 233);
    }
    .breadcrumb li:nth-child(5) a:after {
      border-left-color: rgb(224, 233, 233);
    }
    .breadcrumb li:last-child a {
      background: rgb(238, 235, 232) !important;
      color: black;
      pointer-events: none;
      cursor: default;
      padding-right: 20px;
    }
    .breadcrumb li:last-child a::after {
      border: 0;
    }
    
    .breadcrumb li a:hover {
      background: rgb(194, 226, 221);
    }
    .breadcrumb li a:hover:after {
      border-left-color: rgb(194, 226, 221) !important;
    }
      `}</style>
    </nav>

  );
};

export default Breadcrumbs;