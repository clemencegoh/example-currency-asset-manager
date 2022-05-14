import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Note here that we're using local stategy
 * This means that it's possible to use multiple strategies for guard
 * Strategies here: http://www.passportjs.org/packages/
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
