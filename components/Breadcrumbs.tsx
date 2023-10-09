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
      <ol className="breadcrumb">
        <li>
          <a href="/">HOME</a>
        </li>
        {breadcrumbs.map((breadcrumb, i) => {
          return (
            <li key={breadcrumb.href}>
              <Link href={breadcrumb.href} legacyBehavior>
                <a>
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