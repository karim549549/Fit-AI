import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Default directory for proto files
const DEFAULT_PROTO_DIR = './proto';
const OUTPUT_DIR = './libs/common/src/types';

// Get all .proto files in a directory
function getProtoFiles(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter(file => file.endsWith('.proto'))
    .map(file => path.join(dir, file));
}

function main() {
  const protoFiles = getProtoFiles(DEFAULT_PROTO_DIR);

  if (protoFiles.length === 0) {
    console.error('No .proto files found.');
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  try {
    // Generate TypeScript types for each proto file
    protoFiles.forEach(protoFile => {
      const command = `protoc \
        --plugin=protoc-gen-ts_proto="D:\\GraduationProject\\Version3\\Fitai\\node_modules\\.bin\\protoc-gen-ts_proto.cmd" \
        --ts_proto_out=${OUTPUT_DIR} \
        --ts_proto_opt=nestJs=true \
        --proto_path=${DEFAULT_PROTO_DIR} \
        ${protoFile}`;
      console.log(`Generating TypeScript types for: ${protoFile}`);
      execSync(command, { stdio: 'inherit' });
    });

    console.log('TypeScript types generated successfully!');
  } catch (error) {
    console.error('Error while generating TypeScript types:', error.message);
    process.exit(1);
  }
}

main();
